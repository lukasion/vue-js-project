import type { Store } from 'pinia'

/**
 * A factory function that returns a Pinia store instance.
 * @example () => useMyStore()
 */
type StoreFactory<TStore extends Store> = () => TStore

/**
 * Utility type to filter out Pinia's internal properties (e.g., $id, $state).
 */
type PiniaKeys = `$${string}`

/**
 * Extracts *only* the state property keys from a store type.
 */
type StateKeys<TStore extends Store> = keyof TStore['$state']

/**
 * Extracts *only* the getter property keys from a store type.
 *
 * It works by finding all non-function properties, then excluding
 * state keys and internal Pinia keys.
 */
type GetterKeys<TStore extends Store> = {
  [K in keyof TStore]: TStore[K] extends Function ? never : K
}[keyof TStore] extends infer NonFunctionKeys
    ? Exclude<NonFunctionKeys, StateKeys<TStore> | PiniaKeys>
    : never

/**
 * Extracts *only* the action function keys from a store type.
 *
 * It works by finding all function properties, then excluding
 * internal Pinia methods.
 */
type ActionKeys<TStore extends Store> = {
  [K in keyof TStore]: TStore[K] extends Function ? K : never
}[keyof TStore] extends infer FunctionKeys
    ? Exclude<FunctionKeys, PiniaKeys>
    : never

// ##################################################################
// ## Helper Function
// ##################################################################

/**
 * Determines the store key to map.
 * Uses the provided 'mappedKey' if available,
 * otherwise defaults to the class property's 'propertyKey'.
 */
function getStoreKey(
    propertyKey: string | symbol,
    mappedKey?: string | number | symbol
): string {
  return (mappedKey ?? propertyKey) as string
}

// ##################################################################
// ## Decorators
// ##################################################################

/**
 * Decorator to map a Pinia store **state** property to a class property.
 * Creates a getter/setter that reads from and writes to the store's state.
 *
 * @example
 * class MyComponent {
 * // Maps store.count to this.localCount
 * @State(useCounterStore, 'count')
 * localCount!: number
 *
 * // Maps store.count to this.count
 * @State(useCounterStore)
 * count!: number
 * }
 */
export function State<
    TStore extends Store,
    K extends StateKeys<TStore>
>(
    storeFactory: StoreFactory<TStore>,
    stateName?: K
) {
  return function (target: object, propertyKey: string | symbol) {
    const storeKey = getStoreKey(propertyKey, stateName) as K

    if (process.env.NODE_ENV !== 'production') {
      const store = storeFactory()
      if (!(storeKey in store.$state)) {
        console.warn(
            `[Pinia Decorator] @State: Key "${storeKey}" does not exist on store "${store.$id}". ` +
            `Available state keys: ${Object.keys(store.$state).join(', ')}`
        )
      }
    }

    Object.defineProperty(target, propertyKey, {
      get() {
        return storeFactory()[storeKey]
      },
      set(value: TStore['$state'][K]) {
        storeFactory()[storeKey] = value
      },
      enumerable: true,
      configurable: true,
    })
  }
}

/**
 * Decorator to map a Pinia store **getter** to a class property.
 * Creates a read-only computed property.
 *
 * @example
 * class MyComponent {
 * // Maps store.doubleCount to this.localDouble
 * @Getter(useCounterStore, 'doubleCount')
 * localDouble!: number
 *
 * // Maps store.doubleCount to this.doubleCount
 * @Getter(useCounterStore)
 * doubleCount!: number
 * }
 */
export function Getter<
    TStore extends Store,
    K extends GetterKeys<TStore>
>(
    storeFactory: StoreFactory<TStore>,
    getterName?: K
) {
  return function (target: object, propertyKey: string | symbol) {
    const storeKey = getStoreKey(propertyKey, getterName) as K

    if (process.env.NODE_ENV !== 'production') {
      const store = storeFactory()
      if (store[storeKey] === undefined || typeof store[storeKey] === 'function') {
        console.warn(
            `[Pinia Decorator] @Getter: Key "${storeKey}" does not seem to be a valid getter on store "${store.$id}".`
        )
      }
    }

    Object.defineProperty(target, propertyKey, {
      get() {
        return storeFactory()[storeKey]
      },
      enumerable: true,
      configurable: true,
    })
  }
}

/**
 * Decorator to map a Pinia store **action** to a class property.
 * Creates a property that returns the store action bound to the store instance.
 *
 * @example
 * class MyComponent {
 * // Maps store.increment to this.inc
 * @Action(useCounterStore, 'increment')
 * inc!: () => void
 *
 * // Maps store.increment to this.increment
 * @Action(useCounterStore)
 * increment!: () => void
 * }
 */
export function Action<
    TStore extends Store,
    K extends ActionKeys<TStore>
>(
    storeFactory: StoreFactory<TStore>,
    actionName?: K
) {
  return function(target: object, propertyKey: string | symbol) {
    const storeKey = getStoreKey(propertyKey, actionName) as K

    if (process.env.NODE_ENV !== 'production') {
      const store = storeFactory()
      if (typeof store[storeKey] !== 'function') {
        console.warn(
            `[Pinia Decorator] @Action: Key "${storeKey}" does not seem to be a valid action (function) on store "${store.$id}".`
        )
      }
    }

    Object.defineProperty(target, propertyKey, {
      get() {
        const store = storeFactory()
        const action = store[storeKey]

        if (typeof action === 'function') {
          return action.bind(store)
        }

        return undefined
      },
      enumerable: true,
      configurable: true,
    })
  }
}
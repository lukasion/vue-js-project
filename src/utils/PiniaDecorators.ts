import { Store } from "pinia"

type StoreFactory<TStore extends Store> = () => TStore
type StateKeys<TStore extends Store> = {
  // eslint-disable-next-line
  [K in keyof TStore]: TStore[K] extends (...args: any[]) => any ? never : K
}[keyof TStore]

/** Utility to resolve property name */
function resolvePropName (
  target: object,
  propertyKey: string | symbol,
  name?: string | number | symbol
): string {
  return (name ?? propertyKey).toString()
}

/**
 * Binds a property to a Pinia store state field
 */
export function State<TStore extends Store, K extends StateKeys<TStore>> (
  storeFactory: StoreFactory<TStore>,
  stateName?: K
) {
  return (target: object, propertyKey: string | symbol) => {
    const propName = resolvePropName(target, propertyKey, stateName)
    Object.defineProperty(target, propertyKey, {
      get () {
        return storeFactory()[propName as K]
      },
      set (value: TStore[K]) {
        storeFactory()[propName as K] = value
      },
      enumerable: true,
      configurable: true,
    })
  }
}

/**
 * Binds a property to a Pinia store getter
 */
export function Getter<TStore extends Store, K extends keyof TStore> (
  storeFactory: StoreFactory<TStore>,
  getterName?: K
) {
  return (target: object, propertyKey: string | symbol) => {
    const propName = resolvePropName(target, propertyKey, getterName)
    Object.defineProperty(target, propertyKey, {
      get () {
        return storeFactory()[propName as K]
      },
      enumerable: true,
      configurable: true,
    })
  }
}

/**
 * Binds a property to a Pinia store action (and automatically binds its context)
 */
export function Action<TStore extends Store, K extends keyof TStore> (
  storeFactory: StoreFactory<TStore>,
  actionName?: K
) {
  return (target: object, propertyKey: string | symbol) => {
    const propName = resolvePropName(target, propertyKey, actionName)
    Object.defineProperty(target, propertyKey, {
      get () {
        const store = storeFactory()
        const fn = store[propName]
        return typeof fn === "function" ? fn.bind(store) : fn
      },
      enumerable: true,
      configurable: true,
    })
  }
}

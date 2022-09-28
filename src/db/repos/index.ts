import { SubscriptionsRepository } from "./subscriptions";

// Database Interface Extensions:
interface IExtensions {
  subscriptions: SubscriptionsRepository;
}

export { IExtensions, SubscriptionsRepository };

const subscriptions = {};
const getNextUniqueId = getIdGenerator();

function subscribe(eventType, callback) {
  const id = getNextUniqueId();

  if (!subscriptions[eventType]) subscriptions[eventType] = {};

  subscriptions[eventType][id] = callback;

  return {
    unsubscribe: () => {
      delete subscriptions[eventType][id];
      if (Object.keys(subscriptions[eventType]).length === 0)
        delete subscriptions[eventType];
    },
  };
}

function publish(eventType, arg) {
  if (!subscriptions[eventType]) return;

  Object.keys(subscriptions[eventType]).forEach((key) =>
    subscriptions[eventType][key](arg)
  );
}

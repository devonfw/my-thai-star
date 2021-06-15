// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require("ask-sdk-core");

const util = process.env.DEBUG ? require("./utilMock") : require("./util");

const messages = {
  WELCOME:
    "Welcome to the Sample Alexa Customer Profile API Skill! You can ask for your name, your email address, or your phone number. What do you want to ask?",
  WHAT_DO_YOU_WANT: "What do you want to ask?",
  NOTIFY_MISSING_PERMISSIONS:
    "Please enable Customer Profile permissions in the Amazon Alexa app.",
  NAME_MISSING:
    "You can set your name either in the Alexa app under calling and messaging, or you can set it at Amazon.com, under log-in and security.",
  EMAIL_MISSING:
    "You can set your email at Amazon.com, under log-in and security.",
  NUMBER_MISSING:
    "You can set your phone number at Amazon.com, under log-in and security.",
  NAME_AVAILABLE: "Here is your full name: ",
  RESERVED_TABLE: "Reserved Table for: ",
  NUMBER_AVAILABLE: "Here is your phone number: ",
  ERROR: "Uh Oh. Looks like something went wrong.",
  API_FAILURE:
    "There was an error with the Alexa Customer Profile API. Please try again.",
  GOODBYE: "Bye! Thanks for using the Sample Alexa Customer Profile API Skill!",
  UNHANDLED: "This skill doesn't support that. Please ask something else.",
  HELP: "You can use this skill by asking something like: whats my name?",
  STOP: "Bye! Thanks for using the Sample Alexa Customer Profile API Skill!",
};

const PERMISSIONS = [
  "read::alexa:device:all:address",
  "alexa::profile:name:read",
  "alexa::profile:email:read",
  "alexa::profile:mobile_number:read",
];

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  async handle(handlerInput) {
    const speakOutput =
      "Welcome to My Thai Star. If you want to know what i can do for you please say Help";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const ReserveIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "ReserveIntent"
    );
  },
  async handle(handlerInput) {
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();

    const lastAction = sessionAttributes.lastAction;

    switch (lastAction) {
      case "setDate":
        sessionAttributes.date =
          handlerInput.requestEnvelope.request.intent.slots.date.value;
        break;
      case "setTime":
        sessionAttributes.time =
          handlerInput.requestEnvelope.request.intent.slots.time.value;
        break;
      case "setAssistants":
        sessionAttributes.assistants =
          handlerInput.requestEnvelope.request.intent.slots.assistants.value;
        break;
      case "setWantsToOrder":
        sessionAttributes.wantsToOrder =
          handlerInput.requestEnvelope.request.intent.slots.wantsToOrder.value;
        break;
      default:
        break;
    }

    const date = sessionAttributes.date;
    const time = sessionAttributes.time;
    const assistants = sessionAttributes.assistants;
    const wantsToOrder = sessionAttributes.wantsToOrder;

    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    if (wantsToOrder == "no") {
      const client = handlerInput.serviceClientFactory.getUpsServiceClient();
      const email = await client.getProfileEmail();
      const name = await client.getProfileName();

      const combinedDate = date + "T" + time + ":00";

      util.createReservation(name, email, combinedDate, assistants, false);
      return handlerInput.responseBuilder
        .speak(
          messages.RESERVED_TABLE + email + " for " + date + " at " + time + "."
        )
        .getResponse();
    } else if (!date && wantsToOrder === undefined) {
      sessionAttributes.lastAction = "setDate";
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .addElicitSlotDirective("date")
        .speak("On what date do you want to reserve the table?")
        .getResponse();
    } else if (!time && wantsToOrder === undefined) {
      sessionAttributes.lastAction = "setTime";
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .addElicitSlotDirective("time")
        .speak("On what time do you want to reserve the table?")
        .getResponse();
    } else if (!assistants && wantsToOrder === undefined) {
      sessionAttributes.lastAction = "setAssistants";
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .addElicitSlotDirective("assistants")
        .speak("With how many people are you going to come?")
        .getResponse();
    } else if (date && time && assistants && wantsToOrder === undefined) {
      sessionAttributes.lastAction = "setWantsToOrder";

      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .addElicitSlotDirective("wantsToOrder")
        .speak("Do you want to add an order to your reservation?")
        .getResponse();
    } else if (date && time && assistants && wantsToOrder === "yes") {
      sessionAttributes.lastAction = "setDish";

      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .addElicitSlotDirective("dish", {
          name: "OrderIntent",
          confirmationStatus: "CONFIRMED",
          slots: {},
        })
        .speak("What item do you want to add to your order?")
        .getResponse();
    }
  },
};

const OrderIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" && request.intent.name === "OrderIntent"
    );
  },
  async handle(handlerInput) {
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    if (!sessionAttributes.orderlist) sessionAttributes.orderlist = [];

    const lastAction = sessionAttributes.lastAction;

    switch (lastAction) {
      case "setDish":
        if (
          handlerInput.requestEnvelope.request.intent.slots.dish.resolutions
            .resolutionsPerAuthority[0].values
        ) {
          sessionAttributes.dish =
            handlerInput.requestEnvelope.request.intent.slots.dish.resolutions.resolutionsPerAuthority[0].values[0].value;
        } else {
          return handlerInput.responseBuilder
            .addElicitSlotDirective("dish")
            .speak(
              "Sorry, i did not understand you, please order an item from the menu"
            )
            .getResponse();
        }
        break;
      case "setAmount":
        sessionAttributes.amount =
          handlerInput.requestEnvelope.request.intent.slots.amount.value;
        break;
      case "setCompletedOrder":
        sessionAttributes.oneMoreOrder =
          handlerInput.requestEnvelope.request.intent.slots.completedOrder.value;
        break;
      default:
        break;
    }

    const amount = sessionAttributes.amount;
    const dish = sessionAttributes.dish;
    const oneMoreOrder = sessionAttributes.oneMoreOrder;

    const client = handlerInput.serviceClientFactory.getUpsServiceClient();
    const email = await client.getProfileEmail();
    const name = await client.getProfileName();
    const { deviceId } = handlerInput.requestEnvelope.context.System.device;
    const deviceAddressServiceClient =
      handlerInput.serviceClientFactory.getDeviceAddressServiceClient();
    const address = await deviceAddressServiceClient.getFullAddress(deviceId);

    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    if (
      handlerInput.requestEnvelope.request.intent.slots.confirmation.value ===
      undefined
    ) {
      if (!dish && (oneMoreOrder === "yes" || oneMoreOrder === undefined)) {
        sessionAttributes.lastAction = "setDish";
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("dish")
          .speak("What item do you want to add to your order?")
          .getResponse();
      } else if (
        !amount &&
        (oneMoreOrder === "yes" || oneMoreOrder === undefined)
      ) {
        sessionAttributes.lastAction = "setAmount";
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("amount")
          .speak("How many times would you like to order that item")
          .getResponse();
      } else if (
        amount &&
        dish &&
        (oneMoreOrder === "yes" || oneMoreOrder === undefined)
      ) {
        sessionAttributes.lastAction = "setCompletedOrder";

        sessionAttributes.orderlist.push({ dish, amount });

        delete sessionAttributes.amount;
        delete sessionAttributes.dish;
        delete sessionAttributes.completedOrder;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("completedOrder")
          .speak("Do you want to add another item from the Menu?")
          .getResponse();
      } else if (amount && dish && oneMoreOrder === "no") {
        return handlerInput.responseBuilder
          .addElicitSlotDirective("confirmation")
          .speak("Do you want to hear your Order again?")
          .getResponse();
      }
      if (!dish && (oneMoreOrder === "yes" || oneMoreOrder === undefined)) {
        sessionAttributes.lastAction = "setDish";
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("dish")
          .speak("What item do you want to add to your order?")
          .getResponse();
      } else if (
        !amount &&
        (oneMoreOrder === "yes" || oneMoreOrder === undefined)
      ) {
        sessionAttributes.lastAction = "setAmount";
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("amount")
          .speak("How many times would you like to order that item")
          .getResponse();
      } else if (
        amount &&
        dish &&
        (oneMoreOrder === "yes" || oneMoreOrder === undefined)
      ) {
        sessionAttributes.lastAction = "setCompletedOrder";

        sessionAttributes.orderlist.push({ dish, amount });

        delete sessionAttributes.amount;
        delete sessionAttributes.dish;
        delete sessionAttributes.completedOrder;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("completedOrder")
          .speak("Do you want to add another item from the Menu?")
          .getResponse();
      } else if (oneMoreOrder === "no") {
        return handlerInput.responseBuilder
          .addElicitSlotDirective("confirmation")
          .speak("Do you want to hear your Order again?")
          .getResponse();
      }
    } else if (
      handlerInput.requestEnvelope.request.intent.slots.confirmation.value &&
      oneMoreOrder === "no"
    ) {
      if (
        handlerInput.requestEnvelope.request.intent.slots.confirmation.value ===
          "yes" &&
        handlerInput.requestEnvelope.request.intent.slots.correct.value ===
          undefined
      ) {
        var speakOutput = "Your Order is: \n";
        var i;

        const orders = sessionAttributes.orderlist;
        for (i = 0; i < orders.length; i++) {
          speakOutput +=
            orders[i].amount + " times the " + orders[i].dish.name + ".\n";
        }
        speakOutput += "Is that correct?";

        return handlerInput.responseBuilder
          .addElicitSlotDirective("correct")
          .speak(speakOutput)
          .getResponse();
      } else if (
        (handlerInput.requestEnvelope.request.intent.slots.confirmation
          .value === "yes" &&
          handlerInput.requestEnvelope.request.intent.slots.correct.value ===
            "yes") ||
        handlerInput.requestEnvelope.request.intent.slots.confirmation.value ===
          "no"
      ) {
        if (sessionAttributes.wantsToOrder === undefined) {
          await util.createDelivery(
            name,
            email,
            sessionAttributes.orderlist,
            address
          );
          return handlerInput.responseBuilder
            .speak(
              "Your delivery has been placed. Thank you for ordering from us."
            )
            .getResponse();
        } else if (sessionAttributes.wantsToOrder === "yes") {
          const date = sessionAttributes.date;
          const time = sessionAttributes.time;
          const assistants = sessionAttributes.assistants;

          const combinedDate = date + "T" + time + ":00";

          util.createOrder(
            name,
            email,
            sessionAttributes.orderlist,
            combinedDate,
            assistants
          );
          return handlerInput.responseBuilder
            .speak("Your Order has been placed. Thank you for your booking.")
            .getResponse();
        }
      } else if (
        handlerInput.requestEnvelope.request.intent.slots.confirmation.value ===
          "yes" &&
        handlerInput.requestEnvelope.request.intent.slots.correct.value === "no"
      ) {
        return handlerInput.responseBuilder
          .speak(
            "I'm Sorry to hear that. If you want to make a new Order please call the My Thai Star Skill again."
          )
          .getResponse();
      }
    }
  },
};

const OrderStateHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "OrderStateIntent"
    );
  },
  async handle(handlerInput) {
    const client = handlerInput.serviceClientFactory.getUpsServiceClient();
    const email = await client.getProfileEmail();

    const orders = await util.getActiveOrders(email);
    console.log(orders);

    var i;
    let res =
      "you currently have " + orders.content.length + " open orders. \n";

    for (i = 0; i < orders.content.length; i++) {
      let state;
      switch (orders.content[i].orders[0].stateId) {
        case 0:
          state = "ordered";
          break;
        case 1:
          state = "preperation";
          break;
        case 2:
          state = "delivery";
          break;
        default:
          break;
      }
      var t = new Date(1970, 0, 1);
      t.setSeconds(parseInt(orders.content[i].creationDate) + 7200);

      var date =
        t.toDateString() + " at " + t.getHours() + ":" + t.getMinutes();
      console.log(date);
      if (orders.content.length === 1) {
        res +=
          "\n" +
          "Your order is currently in the state: " +
          state +
          ". It was placed on: " +
          date +
          "." +
          "\n";
      } else {
        res +=
          "\n" +
          "Your " +
          (i + 1) +
          "th order is currently in the state: " +
          state +
          ". It was placed on: " +
          date +
          "." +
          "\n";
      }
    }

    return handlerInput.responseBuilder.speak(res).getResponse();
  },
};

const AddressIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AddressIntent"
    );
  },

  async handle(handlerInput) {
    const speakOutput =
      "The restaurants address is Place de l'Étoile - 11 rue de Tilsitt - 75017 Paris.";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  async handle(handlerInput) {
    const speakOutput =
      "I currently have following commands: order food, reserve a table and whats the state of my order";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  async handle(handlerInput) {
    const speakOutput = "Goodbye!";
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  async handle(handlerInput) {
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse();
  },
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  async handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
  canHandle() {
    return true;
  },
  async handle(handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const ProfileError = {
  canHandle(handlerInput, error) {
    return error.name === "ServiceError";
  },
  handle(handlerInput, error) {
    if (error.statusCode === 403) {
      return handlerInput.responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard(PERMISSIONS)
        .getResponse();
    }
    return handlerInput.responseBuilder
      .speak(messages.LOCATION_FAILURE)
      .reprompt(messages.LOCATION_FAILURE)
      .getResponse();
  },
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ReserveIntentHandler,
    OrderIntentHandler,
    OrderStateHandler,
    AddressIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  )
  .addErrorHandlers(ProfileError)
  .withApiClient(new Alexa.DefaultApiClient())
  .addErrorHandlers(ErrorHandler)
  .lambda();

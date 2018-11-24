const responseBuilder = require('./response')

exports.handler = (event, context) => {
  const request = event.request

  if (request.type === 'LaunchRequest') {
    const options = {
      speechText: 'Welcome to greetings skill. Using our skill you can greet your guests. Whom you want to greet ?',
      repromptText: 'You can say for example, say hello to John ',
      endSession: false
    }
    context.succeed(responseBuilder(options))
  } else if (request.type === 'IntentRequest') {
    if (request.intent.name === 'HelloIntent') {
      const name = request.intent.slots.FirstName.value
      const options = {
        speechText: `Hello ${name} . ${wish()}`,
        endSession: true
      }
      context.succeed(responseBuilder(options))
    } else context.fail('Unknown Intent')
  } else if (request.type === 'SessionEndedRequest') {

  } else {
    context.fail('Unknow intent')
  }
}

function wish () {
  const currentDate = new Date()
  const hours = currentDate.getUTCHours()

  if (hours < 12) {
    return 'Good Morning .'
  }
  if (hours < 18) {
    return 'Good afternoon .'
  }
  if (hours > 18) {
    return 'Good evening .'
  }
}

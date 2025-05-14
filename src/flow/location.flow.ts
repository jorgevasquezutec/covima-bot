import { EVENTS, addKeyword } from "@builderbot/bot";

export const localtionFlow = addKeyword(EVENTS.LOCATION)
    .addAnswer("I have received your location!", null, async (ctx) => {
        console.log("ctx", ctx.message);
        const userLatitude = ctx.message.locationMessage.degreesLatitude;
        const userLongitude = ctx.message.locationMessage.degreesLongitude;
        const addres = ctx.message.locationMessage.address;
        console.log("userLatitude", userLatitude);
        console.log("userLongitude", userLongitude);
        console.log("addres", addres);
    })
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';
import db from '../db/index';
var request = require('request');

export let onConversation = functions.database.ref('/conversation/{uid}/{pushId}')
    .onWrite(event => {
        const data: any = event.data.val();
        if (data != null) {
            if (data.name != 'Bot') {
                // console.log("uid", event.params.uid)
                // console.log("messages", data.text)
                // console.log("messages", event.params.pushId)
                var options = {
                    url: 'https://api.api.ai/api/query?v=20150910&query=' + data.text + '&lang=en&sessionId=898aae69-9d7d-4dd3-abeb-721ca2a44bb6&timezone=2017-03-24T21:10:33+0500',
                    headers: {

                        'Authorization': 'Bearer b74e0f82499f48d3a01c735824a47b95'
                    }
                    
                };

                request(options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        // botReply.message = JSON.parse(body.result.fulfillment.speech);
                        response = JSON.parse(body)
                        console.log('user msg & bot reply',data.text, response.result.fulfillment.speech)
                        db.ref('/conversation/'+ event.params.uid + '/').push({
                            name: 'Bot',
                            imageUrl: '../assets/images/bot.jpg',
                            text: response.result.fulfillment.speech
                        })
                    }
                });
            }
        }
    });


// ==UserScript==
// @name         AvianMailer
// @namespace    -
// @version      1.0.0
// @description  To eliminate use of premium to auto mate farming in factor you can use this script. Keep your browser with "rivalregions.com/#work" open.
// @author       Akkil
// @match       *://mail.google.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_log
// ==/UserScript==

(function() {
    'use strict';

    function wait(sec) {
        return new Promise(res => setTimeout(res, sec * 1000));
    }

    const apiUrl = "http://localhost:3000/api/email";
    const identity = "your_identity"; 

    async function update(id, status) {
        GM_xmlhttpRequest({
            method: "PUT",
            url: apiUrl,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
              _id: id,
              identity: identity,
              status: status
            }),
            onload: function(response) {
                const responseData = JSON.parse(response.responseText);
                if (responseData && responseData.success) {
                    return true;
                } else {
                    return false;
                }
            },
            onerror: function(error) {
                return false;
            }
        });
        return false;
    }

    async function composeAndSend(id, emailAddress, subjectText, bodyText) {
        await wait(4);

        const composeButton = document.querySelector('.T-I.T-I-KE.L3');
        if (!composeButton) {
            console.error("Compose button not found.");
            return;
        }

        await wait(2);
        composeButton.click();
        await wait(4);

        const toInput = document.querySelector('textarea[name="to"]') || document.querySelector('input[aria-label="To recipients"]');
        const subjectInput = document.querySelector('input[name="subjectbox"]');
        const bodyDiv = document.querySelector('div[aria-label="Message Body"]');

        if (toInput && subjectInput && bodyDiv) {
            toInput.focus();
            toInput.value = emailAddress;
            toInput.dispatchEvent(new Event('input', { bubbles: true }));
            subjectInput.focus();
            subjectInput.value = subjectText;
            subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
            bodyDiv.focus();
            document.execCommand('insertText', false, bodyText);
            await wait(1);
            const sendButton = document.querySelector('div[aria-label^="Send"][role="button"]');
            if (sendButton) {
                sendButton.click();
                await update(id, true);
            } else {
                await update(id, false);
                console.error("Send button not found.");
            }
            return;
        }
        await wait(0.5);

        console.error("Failed to find all compose fields after multiple attempts.");
    }

    async function sending() {
       GM_xmlhttpRequest({
           method: "GET",
           url: apiUrl,
           headers: {
               "Content-Type": "application/json",
               "identity": identity
           },
           onload: function(response) {
               const responseData = JSON.parse(response.responseText);
               if (responseData && responseData.success) {
                  responseData.emails.map((email) => {
                      if (document.querySelector('.T-I.T-I-KE.L3')) {
                          clearInterval(checkInterval);
                          composeAndSend(email._id, email.recipient, email.subject, email.body);
                      }
                  });
               } else {
                   console.log('No data or unsuccessful response.');
               }
           },
           onerror: function(error) {
               console.error('Error sending request:', error);
           }
       });
    }

    const checkInterval = setInterval(() => {
        sending();
    }, 1000);
})();

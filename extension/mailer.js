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

    // Step 1: Send a POST request to an API
    const apiUrl = "https://your-api-endpoint.com"; // Replace with actual API URL
    const requestBody = {
        key1: "value1",  // Example key-value pairs
        key2: "value2",
    };

  // const emailAddress = 'recipient@example.com';
  //   const subjectText = 'Auto-Generated Email';
  //   const bodyText = 'fdsv';


    async function composeAndSend(emailAddress, subjectText, bodyText) {
        // Wait for Gmail to fully load
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
            // To
            toInput.focus();
            toInput.value = emailAddress;
            toInput.dispatchEvent(new Event('input', { bubbles: true }));

            // Subject
            subjectInput.focus();
            subjectInput.value = subjectText;
            subjectInput.dispatchEvent(new Event('input', { bubbles: true }));

            // Body
            bodyDiv.focus();
            document.execCommand('insertText', false, bodyText);

            // Click Send
            await wait(1);
            const sendButton = document.querySelector('div[aria-label^="Send"][role="button"]');
            if (sendButton) {
                sendButton.click();
            } else {
                console.error("Send button not found.");
            }
            return;
        }
        await wait(0.5);

        console.error("Failed to find all compose fields after multiple attempts.");
    }


    // GM_xmlhttpRequest({
    //     method: "POST",
    //     url: apiUrl,
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     data: JSON.stringify(requestBody),
    //     onload: function(response) {
            // const responseData = JSON.parse(response.responseText);

            // if (responseData && responseData.success) {

                const checkInterval = setInterval(() => {
                    if (document.querySelector('.T-I.T-I-KE.L3')) {
                        clearInterval(checkInterval);
                        composeAndSend("alicejacobcape@gmail.com", "Test", "Test");
                    }
                }, 1000);


            // } else {
            //     console.log('No data or unsuccessful response.');
            // }
        // },
    //     onerror: function(error) {
    //         console.error('Error sending request:', error);
    //     }
    // });
})();

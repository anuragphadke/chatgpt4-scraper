

function sleepyTime(sleepTime) {
    return new Promise(resolve => {
        if (sleepTime === undefined) {
            sleepTime = Math.random() * 5000; // Random duration up to 5 seconds
        }
        setTimeout(resolve, sleepTime);
    });
}

async function submitForm(inputQuery) {
    let textarea = document.getElementById('prompt-textarea');
    textarea.value = inputQuery;
    await sleepyTime();

    let inputEvent = new Event('input', {
        'bubbles': true,
        'cancelable': true
    });
    textarea.dispatchEvent(inputEvent);
    await sleepyTime();

    let submitButton = document.querySelector('[data-testid="send-button"]');
    if (!submitButton.disabled) {
        submitButton.click();
    }

    await sleepyTime(10000);

    var elements = document.querySelectorAll('[data-testid^="conversation"]');

    if (elements.length > 0) {
        var lastElementText = elements[elements.length - 1].textContent || elements[elements.length - 1].innerText;
        console.log("returning success: ", lastElementText)
        return {
            status: 'success',
            output: lastElementText
        };
    } else {
        console.log("OUTPUT:No matching elements found.");
        return {
            status: 'failure',
            output: 'no output'
        };    
    }
}

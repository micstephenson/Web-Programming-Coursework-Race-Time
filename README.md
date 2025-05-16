# Race Time - By up2197433
## Key features
### Two Separate Pages for marking laps and assigning positions.
This was acheived by duplicating the lap list from the 'runner' page onto the 'results' page, with select buttons added onto each lap in the results page so that they can assign runners to lap positions. Data positioning was a key part of making this possible.

### Save/Export Results.
After each lap slot has been filled, the user can click the upload button to export the results as a CSV file.
This CSV file (along with any previous races since the server has been running) can then be downloaded from the homepage, straight to your downloads folder.
The user simply needs to input the number of the race that they'd like to download.

### Restart Race Option.
At any point after a race has started, the user has the option to restart their race. This will erase all participant and lap data, however, if they restart the race after completing a previous one, they will still have access to the previous results. After completing another lap they'll be able to upload another set of results without overriding any previous ones. 

### Unique runner identifier numbers
When the user inputs their name and number, they get a randomly generated number that will not get repeated. This makes it easier for them to get their position assigned once they've passed the checkpoint, as the person assigning names to positions will be able to input their number into the search bar to filter out other names. This is also useful for participants who may have the same name.

## STEPS 
### (Monitoring Checkpoints)
Step 1 - Start on the main/home page (they can also register runners)

Step 2 - Click on the runner icon to start the race. The race will only start if there's at least 1 participant in the race.

Step 3 - Each time a participant passes the checkpoint, they must press the racer passed button and tell the racer their position.

Step 4 - Once every participant has passed the checkpoint, they will no longer be allowed to mark any more laps.

### (Assigning Names To Positions)
Step 1 - Start on the main/home page (they can also register runners)

Step 2 - Click on the eye icon to see who has passed the checkpoint. 

Step 3 - They will then ask the passed runners for their position and number (they can search for the participant's number) and assign them.

Step 4 - Once every position has been assigned, they can upload the results to the server.

Step 5 - If they wish to download the file to their downloads folder, they have the option to do that by entering the race number in an input container on the home page.

## AI
I mainly used AI to edit my CSS or to build upon ideas that I wasn't entirely sure how to logically execute. Sometimes it was challenging to find the correct way to position a button or reorganise the structure of a section of HTML, so I would prompt it to guide me in the right direction on how to fix it. In terms of JavaScript, I would ask it to create the foundation of an idea I may have and then I would build upon/restructure it later.


## (1) Fix CSS - 
> How do I get #participant-list to be positioned below #participants-container h1
### Response: 
To position `#participant-list` below `#participants-container h1`, you can use CSS to ensure proper spacing and layout. Here's how you can achieve this:
### Explanation
1. **`margin-bottom` on `#participants-container h1`**: Adds spacing below the heading to separate it from the participant list.
2. **`margin-top` on `#participant-list`**: Ensures there is spacing between the heading and the list.
3. **`text-align`**: Aligns the text of the heading and the participant list as needed.
4. **`width`**: Ensures the participant list spans the full width of its container.

### Result
The `#participant-list` will now be positioned directly below `#participants-container h1` with proper spacing and alignment.

### Outcome: 
This gave me a better understanding of how to use 'margin' and led me to look into learning the CSS box model. I was also able to use this simple knowledge throughout the rest of my code.


## (2) Develop page switching - 
> When I go to another page and come back, (e.g. begin in start.html, click to runner.html and then go back to start.html) I want the participantDivs that I created in index.js to still be there. How do I achieve this?
### Response: 
To ensure that the `participantDivs` persist when navigating between pages, you can use **localStorage** to save the participant data and reload it when the page is revisited. Here's how you can achieve this:

#### 1. **Save Participants to LocalStorage**
Update your index.js file to store the `participants` array in `localStorage` whenever a new participant is added.

Modify the `createParticipant.addEventListener` function:

```javascript
createParticipant.addEventListener('click', () => {
    const first_name = document.getElementById('first_name').value.trim();
    const last_name = document.getElementById('last_name').value.trim();

    if (first_name === '' || last_name === '') {
        alert('Please enter both first and last name.');
        return;
    }

    const full_name = `${first_name} ${last_name}`;

    // Generate a random number
    const randomNum = Math.floor(Math.random() * 1000) + 1;

    // Add participant to the array
    participants.push({ first_name, last_name, racerNum: randomNum });

    // Save participants to localStorage
    localStorage.setItem('participants', JSON.stringify(participants));

    // Display participant details
    const participantDiv = document.createElement('div');
    participantDiv.className = 'participant-entry';
    participantDiv.textContent = `${full_name} - Racer No.: ${randomNum}`;
    participantListContainer.appendChild(participantDiv);

    // Clear the input fields
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
});
```

#### 2. **Load Participants from LocalStorage**
When the page loads, retrieve the participants from `localStorage` and display them.

Add the following code to the bottom of your index.js file:

```javascript
window.addEventListener('DOMContentLoaded', () => {
    const storedParticipants = JSON.parse(localStorage.getItem('participants')) || [];

    // Update the participants array with stored data
    participants.push(...storedParticipants);

    // Display each participant
    storedParticipants.forEach((participant) => {
        const participantDiv = document.createElement('div');
        participantDiv.className = 'participant-entry';
        participantDiv.textContent = `${participant.first_name} ${participant.last_name} - Racer No.: ${participant.racerNum}`;
        participantListContainer.appendChild(participantDiv);
    });
});
```


#### 3. **Explanation**
1. **Saving to LocalStorage**:
   - When a new participant is added, the `participants` array is updated and saved to `localStorage` using `localStorage.setItem`.
   - The data is stored as a JSON string.

2. **Loading from LocalStorage**:
   - When the page loads, the `DOMContentLoaded` event retrieves the stored participants from `localStorage` using `localStorage.getItem`.
   - The data is parsed back into an array using `JSON.parse`.
   - Each participant is displayed by creating a `div` for them.

3. **Persistence**:
   - Since `localStorage` persists data even when the page is refreshed or navigated away, the participant list will remain intact when you return to the page.


#### 4. **Result**
- When you add a participant, their details are saved to `localStorage`.
- When you navigate away from `start.html` and return, the participant list will be reloaded from `localStorage` and displayed on the page.

### Outcome: 
This ended up not being very useful as I still wasn't able to access the data stored on one page when I switched to another. This led me to explore other ways of switching between pages. I initially had multiple HTML pages, however after struggling to maintain local storage data (and not having a working server at the time), I decided to put all three of my pages on one HTML file and separate them by using the section tags. 

## (2.1) Develop page switching - 
> When this button is clicked I want the id=main-page to disappear and then the id=runner-page to appear

### Response:
To achieve this functionality, you can use JavaScript to toggle the visibility of the `#main-page` and `#runner-page` sections when the button is clicked.

#### Explanation
1. **Event Listener**:
   - The `addEventListener` is attached to the `.runner__button` element.
   - When the button is clicked, the default behavior of the `<a>` tag (navigating to `runner.html`) is prevented using `event.preventDefault()`.

2. **Toggle Visibility**:
   - The `#main-page` section is hidden by setting its `style.display` to `none`.
   - The `#runner-page` section is made visible by setting its `style.display` to `block`.

3. **Initial State**:
   - The `#runner-page` section is hidden by default using `style="display: none;"` in the HTML.

#### Result
When the "Runner" button is clicked:
- The `#main-page` section will disappear.
- The `#runner-page` section will appear, allowing the user to interact with the stopwatch and other elements.

### Outcome:
I then activated them when needed by adding the 'active' classList. Even though AI wasn't completely useful in the first prompt, it led me to research new options and learn different techniques.
However, there were still issues when the contents of each section still popped up on pages outside of their container, so I turned to AI again to figure out how to fix this issue.


## (2.2) Develop page switching - 
> I don't want the lap-list-container to be visible when the main page is visible

### Response:
To ensure that the `lap-list-container` is not visible when the main page is visible, you can toggle its visibility by setting its `display` property to `none` when the main page is shown and to `block` when the runner page is shown.

#### Updated JavaScript
Modify your index.js file to include logic for hiding and showing the `lap-list-container`:

```javascript
// Main to runner
document.querySelector('.runner__button').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior of the <a> tag

    // Hide the main page
    document.getElementById('main-page').style.display = 'none';

    // Show the runner page
    document.getElementById('runner-page').style.display = 'block';

    // Show the lap-list-container
    const lapListContainer = document.getElementById('lap-list-container');
    if (lapListContainer) {
        lapListContainer.style.display = 'block';
    }
});

// Runner to main
document.querySelector('.navbar__name').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior of the <a> tag

    // Hide the runner page
    document.getElementById('runner-page').style.display = 'none';

    // Show the main page
    document.getElementById('main-page').style.display = 'block';

    // Hide the lap-list-container
    const lapListContainer = document.getElementById('lap-list-container');
    if (lapListContainer) {
        lapListContainer.style.display = 'none';
    }
});
```

#### Explanation
1. **Hiding the `lap-list-container`**:
   - When the main page is shown (`#main-page`), the `lap-list-container` is hidden by setting its `style.display` to `none`.

2. **Showing the `lap-list-container`**:
   - When the runner page is shown (`#runner-page`), the `lap-list-container` is made visible by setting its `style.display` to `block`.

3. **Conditional Check**:
   - The `if (lapListContainer)` check ensures that the code does not throw an error if the `lap-list-container` element does not exist in the DOM.


#### Optional: Default State in CSS
To ensure the `lap-list-container` is hidden by default when the page loads, you can add the following CSS rule:

```css
#lap-list-container {
    display: none; /* Hidden by default */
}
```

### Result
- When the main page is visible, the `lap-list-container` will be hidden.
- When the runner page is visible, the `lap-list-container` will be shown.

### Outcome:
I thought that changing the style.display of the container from within the JS file would be too repetitive as I'd have to do this with multiple other elements of the page, so I modified the CSS to keep it hidden.

## (3) Download Button - 
> is there a way for me to let the user download the csv file to their browser downloads
### Response: 
Yes, you can let users download the CSV file by creating a new route in your Express server that sends the CSV file as a download. Here’s how you can do it:

Add a new route like this:
```javascript
// ...existing code...

app.get('/download', (req, res) => {
    const filePath = `results${raceNum - 1}.csv`; // Use the latest race file
    if (fs.existsSync(filePath)) {
        res.download(filePath, 'race_results.csv', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading file');
            }
        });
    } else {
        res.status(404).send('File not found');
    }
});

// ...existing code...
```
Now, when users visit http://localhost:8080/download, their browser will download the latest CSV file. You can also link to this route from your frontend.

### Outcome:
I took this response and wrote down a series of steps that it would take for me to get the user to download their race result of choice.

These steps were:

1 - Create a new function in my js file to link to the download button event listener/ the input container.

2- The input will be saved as a variable, then converted into an integer

3- Check if the variable is a valid variable, if its not then an error message will appear

4- Fetch the number of races from the server

5- Check if the input variable > number of races, if it is then an error message will appear

6- If not then send that number back to the server so that it knows to download that specific race.

## Reflection/Improvements
I would have wanted to add more filters for ease, e.g. on the name assigning page (eye icon) I would have liked to include a filter that, when clicked, only displayed the positions that didn't have names assigned yet.

I also would've liked to remove names from the participant popup list after they've been clicked to reduce repetition.

It may have been useful to add my data into a database however i feel as though I was more than successful with just using local storage and the server.

I could have added a page or section of the page that was a dedicated leaderboard, however I felt like the runner and possition assignment page were both examples of a leaderboard, however it wouldv'e been good to have a public one for spectators to view in real-time.
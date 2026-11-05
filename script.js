const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');

async function handleFormSubmit(event) {
    event.preventDefault();
    const data = input.value;
    console.log(`User Searched for: ${data}`);

    const url = "https://commons.wikimedia.org/w/api.php?action=query" +
    "&generator=search&gsrsearch=" + encodeURIComponent(data) +
    "&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json&origin=*";
    let jsonData;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        jsonData = await res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return;
    }
    if (!jsonData.query) {
    results.textContent = 'No results found.';
    return;}
    results.innerHTML = '';
    Object.values(jsonData.query.pages).forEach(item => {
        const card = document.createElement('div');
        const cardClass = 'card';
        card.classList.add(cardClass);

        const img = document.createElement('img');
        img.src = item.imageinfo[0].thumburl;
        img.alt = item.title;

        const title = document.createElement('p');
        title.textContent = item.title;

        card.appendChild(img);
        card.appendChild(title);
        results.appendChild(card);
    });


}
form.addEventListener('submit', handleFormSubmit);

document.getElementById('search-btn').addEventListener('click', function(){
    const searchInput = document.getElementById('search-input');
    
    // Show empty input field error message.
    if(searchInput.value === ''){
        toggleError('block');
    }
    else{
        toggleError('none');
        toggleSpinner('block');
        const searchText = searchInput.value;
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(books => displayBooks(books))
        searchInput.value = '';
    }
})

// Spinner function
const toggleSpinner = (displayStyle)=>{
    const loadingSpinner = document.getElementById('spinner');
    loadingSpinner.style.display = displayStyle;
}
// Error message function
const toggleError = (displayStyle)=> {
    const toggleError = document.getElementById('toggle-error');
    toggleError.style.display = displayStyle;
}


const displayBooks = (books)=> {
    // Get Fields
    const error = document.getElementById('error-message');
    const booksSection = document.getElementById('books-section');
    const resultFound = document.getElementById('result-found');

    // Clear Fields
    booksSection.innerHTML = ``;
    error.style.display = 'none';
    resultFound.innerText = 0;

    // Show error message.
    if(books.numFound === 0){
        error.style.display = 'block';
    }
    else {
        // Show how many result found
        resultFound.innerText = `${books.numFound}`;

        // Loop through the result and display all books.
        books.docs.forEach(book => {
        if(book.cover_i !== undefined && book !== ''){
            const div = document.createElement('div');
            div.classList.add = 'col';
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img height="250px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h4 class="card-title">Book name: ${book.title}</h4>
                <h5 class="card-title">Author name: ${book.author_name[0]}</h5>
                <h5 class="card-title">Publish date: ${book.publish_date[0]}</h5>
                <a href="#" class="btn btn-primary">Details</a>
                </div>
            </div>
            `;
            booksSection.appendChild(div);

            // Hide spinner
            toggleSpinner('none');
        }
        
    });
    }
}
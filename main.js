class Books {
    constructor(){
        this.booksArr = [];
        this.name = document.getElementById('name');
        this.author = document.getElementById('author');
        this.add = document.getElementById('form');
        this.container = document.querySelector('.added-books');
        this.displayBooks();
        this.add.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBook();
        }) 

        this.container.addEventListener('click', (e) =>{
            if (e.target.classList.contains('remove')) {
                const index = e.target.dataset.id;
                this.removeBook(index);
            }
        });
    }

    addBook() {
        const name = this.name.value;
        const author = this.author.value;
        this.booksArr.push({name,author});
        localStorage.setItem('books', JSON.stringify(this.booksArr));
        this.displayBooks();
        this.name.value = '';
        this.author.value = '';
    }
    displayBooks() {
        this.container.innerHTML = '';
        this.booksArr.forEach((element, index) => {
            const node_1 = document.createElement('div');
            node_1.setAttribute('class', 'book');
            this.container.appendChild(node_1);
            const node_2 = document.createElement('p');
            node_2.setAttribute('class', 'text');
            node_2.innerText = `${element.name}`;
            node_1.appendChild(node_2);
            const node_3 = document.createElement('p');
            node_3.innerText = `${element.author}`;
            node_1.appendChild(node_3);
            const node_4 = document.createElement('button');
            node_4.innerText = 'remove';
            node_4.setAttribute('class', 'remove')
            node_4.setAttribute('data-id', `${index}`);
            node_1.appendChild(node_4);
            const span = document.createElement('span');
            span.setAttribute('class', 'book-span');
            node_1.appendChild(span);
            
        });
    }
    removeBook(index){
        this.booksArr.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(this.booksArr));
        this.displayBooks();
    }
}
const library = new Books();

if (localStorage.getItem('books')) {
  library.booksArr = JSON.parse(localStorage.getItem('books'));
  library.displayBooks();
}
import "../styles/BookList.css";

interface Book {
  id: number;
  name: string;
  author: string;
  category: string;
  image: string;
}

interface Props {
  books: Book[];
  onAddToCart: (book: Book) => void;
}

export default function BookList({ books, onAddToCart }: Props) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <img src={book.image} alt={book.name} />
          <h4>{book.name}</h4>
          <p>{book.author}</p>
          <button className="add-button" onClick={() => onAddToCart(book)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

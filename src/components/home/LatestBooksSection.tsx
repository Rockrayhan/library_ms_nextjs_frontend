import { fetchAllBooks } from '@/lib/server-api';
import { BookCard } from '../books/BookCard';


const LatestBooksSection = async () => {
    const books = await fetchAllBooks();
    return (
            
      <div className="py-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Latest Books</h2>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {books?.slice(0, 6).map((book: any) => (
                 <BookCard key={book._id} book={book} />
               ))}
             </div>
      </div>
    );
};

export default LatestBooksSection;
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function BookTracker() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("books");
    if (saved) setBooks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = () => {
    if (!title) return;
    const newBook = { title, image, rating, comment };
    setBooks([newBook, ...books]);
    setTitle("");
    setImage("");
    setRating("");
    setComment("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Mes livres lus</h1>

      <Card className="p-4">
        <CardContent className="space-y-3">
          <Input placeholder="Titre du livre" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <Input placeholder="URL de l'image du livre" value={image} onChange={(e)=>setImage(e.target.value)} />
          <Input placeholder="Note /10" value={rating} onChange={(e)=>setRating(e.target.value)} />
          <Textarea placeholder="Pourquoi cette note ?" value={comment} onChange={(e)=>setComment(e.target.value)} />
          <Button onClick={addBook}>Ajouter</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {books.map((b, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{b.title}</h2>
              {b.image && <img src={b.image} alt={b.title} className="w-32 rounded" />}
              <p><strong>Note :</strong> {b.rating}</p>
              <p>{b.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

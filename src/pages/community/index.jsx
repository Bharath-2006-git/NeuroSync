import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { db } from '../../firebase/config';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const Post = ({ title, body, tags = [], author = 'Anonymous', time = '' }) => (
  <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
    <div className="flex items-center justify-between">
      <div className="text-lg font-semibold text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </div>
    <div className="text-sm text-muted-foreground mt-1">{body}</div>
    <div className="flex gap-2 flex-wrap mt-3">
      {tags.map((t) => (
        <span key={t} className="text-xs bg-muted px-2 py-1 rounded-md">#{t}</span>
      ))}
    </div>
    <div className="mt-3 flex gap-2">
      <Button size="xs" variant="secondary">Like</Button>
      <Button size="xs">Reply</Button>
    </div>
  </div>
);

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setPosts(list);
    });
    return () => unsub();
  }, []);

  const createPost = async () => {
    if (!title.trim() || !body.trim()) return;
    await addDoc(collection(db, 'posts'), {
      title: title.trim(),
      body: body.trim(),
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      authorName: user?.displayName || user?.email || 'Anonymous',
      createdAt: serverTimestamp(),
    });
    setTitle('');
    setBody('');
    setTags('');
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Community Forum</h1>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
          <div className="text-lg font-semibold mb-2">Start a discussion</div>
          {!user && <div className="text-sm text-warning mb-2">Please login to post.</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <Input label="Tags (comma-separated)" value={tags} onChange={(e)=>setTags(e.target.value)} />
          </div>
          <div className="mt-3">
            <textarea value={body} onChange={(e)=>setBody(e.target.value)} className="w-full bg-input rounded-lg p-3 outline-none" rows={4} placeholder="Share your thoughts…" />
          </div>
          <div className="mt-3 text-right">
            <Button size="sm" onClick={createPost} disabled={!user}>Post</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {posts.map((p) => (
              <Post key={p.id} title={p.title} body={p.body} tags={p.tags || []} author={p.authorName} time={p.createdAt?.toDate ? p.createdAt.toDate().toLocaleString() : ''} />
            ))}
          </div>
          <aside className="space-y-4">
            <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
              <div className="font-semibold mb-2">Popular Topics</div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Baby Kicks</li>
                <li>Prenatal Vitamins</li>
                <li>Sleep Tips</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Community;

import React, { useState } from 'react';
import { fanComments, Comment } from '../data/mockData';

const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => (
  <div className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-2xl">
      {comment.avatar}
    </div>
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <span className="text-white font-bold">{comment.name}</span>
        <span className="text-white/30 text-xs">{comment.time}</span>
      </div>
      <p className="text-white/70 text-sm mt-1 break-words">{comment.message}</p>
    </div>
  </div>
);

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(fanComments);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    const newComment: Comment = {
      id: Date.now(),
      name: trimmedName,
      avatar: '⚽',
      message: trimmedMessage,
      time: 'Just now',
    };

    setComments([newComment, ...comments]);
    setName('');
    setMessage('');
  };

  return (
    <section className="border-y border-white/10 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white">Fan Comments</h2>
          <p className="text-white/40 text-sm mt-1">
            Join the conversation — {comments.length} comment{comments.length === 1 ? '' : 's'}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 flex flex-col gap-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={40}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-[#f5a623]/60 transition-colors"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts on the tournament..."
            rows={3}
            maxLength={280}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-[#f5a623]/60 transition-colors resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-white/30 text-xs">{message.length}/280</span>
            <button
              type="submit"
              disabled={!name.trim() || !message.trim()}
              className="bg-[#f5a623] hover:bg-[#e09510] disabled:opacity-40 disabled:cursor-not-allowed text-[#0a0a1a] font-bold px-6 py-2.5 rounded-full transition-colors duration-200"
            >
              Post Comment
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comments;

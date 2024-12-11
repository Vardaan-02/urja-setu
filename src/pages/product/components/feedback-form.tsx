import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useIsAuthorized } from '@/hooks/useIsAuthorized';
import { useDispatch } from 'react-redux';
import { Star, Check } from 'lucide-react';
import { postReview } from '@/api/review/postReview';
import { motion, AnimatePresence } from 'framer-motion';

function FeedbackForm({ product }: { product: string }) {
  const { auth } = useIsAuthorized();
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleFeedback() {
    if (auth.uid && auth.name && auth.photoURL) {
      setIsSubmitting(true);
      const payload = {
        id: auth.uid,
        name: auth.name,
        photoURL: auth.photoURL,
        rating,
        comment: feedback,
        date: Date.now().toString(),
      };
      await postReview(product, payload, dispatch);
      setFeedback('');
      setRating(0);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000); // Reset after 3 seconds
    } else {
      console.log('Not authorized to give feedback');
    }
  }

  function handleRatingClick(selectedRating: number) {
    setRating(selectedRating);
  }

  const buttonVariants = {
    idle: { scale: 1 },
    submitting: { scale: 0.95 },
    submitted: { scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 10 } },
  };

  const tickVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2
      }
    },
  };

  return (
    <div className="flex flex-col gap-3 bg-green-50 py-4 px-6">
      <div className="flex items-center gap-2">
        <span className="text-md">Your Rating:</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star}>
              <Star
                onClick={() => handleRatingClick(star)}
                className={`cursor-pointer ${
                  star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
                style={{ width: 24, height: 24 }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 justify-between items-center">
        <input
          type="text"
          className="w-full border outline-none p-2 rounded-md"
          placeholder="feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <motion.div
          initial="idle"
          animate={isSubmitting ? "submitting" : isSubmitted ? "submitted" : "idle"}
          variants={buttonVariants}
          whileTap="submitting"
          whileHover={{ scale: 1.05 }}
        >
          <Button
            onClick={handleFeedback}
            disabled={isSubmitting || isSubmitted}
            className="relative"
          >
            <span className={isSubmitted ? 'opacity-0' : 'opacity-100'}>
              {isSubmitting ? 'Submitting...' : 'Give Feedback'}
            </span>
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  className="absolute rounded-md bg-green-950 inset-0 flex items-center justify-center"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={tickVariants}
                >
                  <Check className="text-white" size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default FeedbackForm;


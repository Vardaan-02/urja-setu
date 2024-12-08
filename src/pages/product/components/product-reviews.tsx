import { Star } from 'lucide-react'
import { Review } from '@/types/product'
import Rating from '@/components/ui/rating'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProductReviewsProps {
  reviews: Review[]
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  console.log(reviews);
  return (
    <div className="mt-12 bg-green-50 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="space-y-6 bg-white/30">
        {reviews?.map((review) => (
          <div key={review.id} className="shadow-md rounded-lg py-4 px-4">
            <div className="flex items-center justify-between mb-2">
              <div className='flex gap-4'>
                <Avatar>
                  <AvatarImage src={review.photoURL} />
                  <AvatarFallback>
                    {review.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-start">
                  <span className="font-semibold">{review.name}</span>
                  <div className="flex">
                  <Rating rating={review.rating} size={14}/>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-600">{review.date}</span>
            </div>
            <p className="text-gray-800">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


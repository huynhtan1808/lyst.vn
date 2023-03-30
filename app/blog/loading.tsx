import { PostCardSkeleton } from '@/components/skeleton/PostCardSkeleton';
import {PostSwiperSkeleton} from '@/components/skeleton/PostSwiperSkeleton';


export default function Loading() {
  return (
    <div className="space-y-6">
      <PostSwiperSkeleton isLoading={true}/>

      <div className="grid grid-cols-1 gap-6">
        <PostCardSkeleton isLoading={true} />
        <PostCardSkeleton isLoading={true} />
        <PostCardSkeleton isLoading={true} />
        <PostCardSkeleton isLoading={true} />
        <PostCardSkeleton isLoading={true} />
        <PostCardSkeleton isLoading={true} />
      </div>
    </div>
  );
}
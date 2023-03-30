import Skeleton, { SkeletonItem } from "@/components/shared/Skeleton";
import Section from "../shared/Section";
import classNames from 'classnames';


export const PostSwiperSkeleton = ({ isLoading }: { isLoading?: boolean }) => {

  return (
    <Section>
       <Skeleton className={classNames({isLoading})}>
        <SkeletonItem className="mb-4 h-8 w-52" />
      </Skeleton>
    </Section>
  );
};
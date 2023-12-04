import { Card } from '../types';
import { Details, ExtraDetails } from './details';

export type DetailCardProps = {
  cardDetails: Card;
  image: string;
};

const DetailCardDeskTop = (props: DetailCardProps) => {
  return (
    <>
      <div className="h-[70vh] w-[70vw] p-2 flex justify-evenly">
        <img
          className="h-[100%] rounded-xl"
          src={props.image}
          alt={'Hero Image'}
        />
        <div className="h-[80%] w-[40%] flex flex-col ml-5">
          {/* Details extracted for dry code */}
          <Details cardDetails={props.cardDetails} />
        </div>
        <div className="h-[80%] flex flex-col ml-5 w-full">
          <ExtraDetails cardDetails={props.cardDetails} />
        </div>
      </div>
    </>
  );
};

export default DetailCardDeskTop;

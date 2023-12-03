import { sphereThemes } from '../themes/sphereThemes';
import { Card } from '../types';
import ReactHtmlParser from 'react-html-parser';
import { DetailRow, Details } from './details';

export type DetailRowProps = {
  label: string;
  value: string | number;
  html?: React.ReactNode;
  colorDetails: string;
};

export type DetailCardProps = {
  cardDetails: Card;
  image: string;
};

const DetailCardDeskTop = (props: DetailCardProps) => {
  const { sphere_code } = props.cardDetails;
  return (
    <>
      <div className="flex justify-evenly h-[70vh] w-[70vw] p-2">
        <img
          className="rounded-xl h-[100%] "
          src={props.image}
          alt={'Hero Image'}
        />

        <div className="h-[80%] flex flex-col ml-5 w-[40%]">
          <Details cardDetails={props.cardDetails} image={''} />
        </div>
        <div className="h-[80%] flex flex-col ml-5 w-full">
          <DetailRow
            label=""
            value=""
            html={ReactHtmlParser(props.cardDetails.text)}
            colorDetails={sphereThemes[sphere_code]}
          />
          <DetailRow
            label=""
            value={props.cardDetails.traits}
            colorDetails={sphereThemes[sphere_code]}
          />
        </div>
      </div>
    </>
  );
};

export default DetailCardDeskTop;

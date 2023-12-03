import { sphereThemes } from '../themes/sphereThemes';
import { DetailCardProps } from './detailCardDesktop';
import ReactHtmlParser from 'react-html-parser';
import { DetailRow, Details } from './details';

export type DetailRowMobileProps = {
  label: string;
  value: string;
};

const DetailCardMobile = (props: DetailCardProps) => {
  const sphereColor = sphereThemes[props.cardDetails.sphere_code];
  return (
    <div
      className="bg-no-repeat rounded-lg h-full w-full bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(to top,${sphereColor}, #273444)`,
        }}
        className="w-[40%] h-full opacity-95 justify-between p-6 flex flex-col"
      >
        <Details cardDetails={props.cardDetails} image={''} />
      </div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom,${sphereColor}, #273444)`,
        }}
        className="w-full h-full opacity-95 flex flex-col items-center p-5"
      >
        {/* EXTRA DETAILS */}
        <DetailRow
          label=""
          value=""
          html={ReactHtmlParser(props.cardDetails.text)}
          colorDetails={sphereThemes[sphereColor]}
        />
        <DetailRow
          label=""
          value={props.cardDetails.traits}
          colorDetails={sphereThemes[sphereColor]}
        />
      </div>
    </div>
  );
};
export default DetailCardMobile;

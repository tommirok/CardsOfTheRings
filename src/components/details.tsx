import useIsMobile from "../hooks/useIsMobileScreen";
import { sphereThemes } from "../themes/sphereThemes";
import { DetailCardProps, DetailRowProps } from "./detailCardDesktop";

export const DetailRow = (props: DetailRowProps) => {
    const isMobile = useIsMobile();
    if (isMobile) {
      return (
        <>
          {!props.html ? (
            <p className="font-bold border-b-2">
              {`${props.label}${props.label && ': '}${props.value}`}
            </p>
          ) : (
            <p className="font-bold">{props.html}</p>
          )}
        </>
      );
    }
    return (
      <div
        style={{
          background: `linear-gradient(to right,${props.colorDetails}, #273444)`,
        }}
        className="flex flex-row items-center  bg-gray-dark rounded-lg p-3 mb-5"
      >
        {!props.html ? (
          <p className="font-bold">
            {`${props.label}${props.label && ': '}${props.value}`}
          </p>
        ) : (
          <p className="font-bold">{props.html}</p>
        )}
      </div>
    );
  };
  

export const Details = (props: DetailCardProps) => {
    const { sphere_code } = props.cardDetails;
    return (
      <>
        <DetailRow
          label="Type"
          value={props.cardDetails.type_name}
          colorDetails={sphereThemes[sphere_code]}
        />
        <DetailRow
          label="Threat"
          value={props.cardDetails.threat}
          colorDetails={sphereThemes[sphere_code]}
        />
        <DetailRow
          label="Will"
          value={props.cardDetails.willpower}
          colorDetails={sphereThemes[sphere_code]}
        />
        <DetailRow
          label="Attack"
          value={props.cardDetails.attack}
          colorDetails={sphereThemes[sphere_code]}
        />
        <DetailRow
          label="Defence"
          value={props.cardDetails.defense}
          colorDetails={sphereThemes[sphere_code]}
        />
        <DetailRow
          label="Health"
          value={props.cardDetails.health}
          colorDetails={sphereThemes[sphere_code]}
        />
        <DetailRow
          label="Sphere"
          value={props.cardDetails.sphere_name}
          colorDetails={sphereThemes[sphere_code]}
        />
      </>
    );
  };
  
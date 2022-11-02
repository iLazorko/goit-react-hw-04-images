import { Vortex } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled.js';

export function Loader() {
  return (
    <LoaderWrap>
      <Vortex
        visible={true}
        height="400"
        width="400"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['blue', 'yellow', 'blue', 'yellow', 'blue', 'yellow']}
      />
    </LoaderWrap>
  );
}

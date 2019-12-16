import * as React from "react";

import { StyledCircularProgress } from './StyledComponents'

interface IOverlayProps {
    isActive: boolean;
}

export default class Overlay extends React.Component<IOverlayProps, {}>{
    constructor(props: IOverlayProps){
        super(props);
    }

    render(){
        if (!this.props.isActive){
            return null;
        }
        return (
            <div style={{position: 'absolute', width: '100%', height: '100%', display: 'block', zIndex: 999, backgroundColor: 'rgba(235,235,235,0.6)'}}>
                <StyledCircularProgress></StyledCircularProgress>
            </div>
        )
    }
}
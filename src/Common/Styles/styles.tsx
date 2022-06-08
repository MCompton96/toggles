import styled from 'styled-components'

interface IStyledOptionOverlay {
    selected: boolean
    noOptions: number
}

interface IStyledOption {
    position: OptionPosition
    selected: boolean
    noOptions: number
}

type OptionPosition = 'left' | 'right' | 'middle'

export const ToggleContainer = styled.div`
    width: 90%;
    margin 10px 0px;
`;

export const ToggleInnerContainer = styled.div`
    position: relative;
    width: 100%;
    flex: 1;
    border: 2px solid #F1F1F1;
    border-radius: 100px;
    opacity: 0.75;
    margin: 0;
    touch-action: none;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    &:hover {
        cursor: pointer;
    }
`;

export const OptionOverlay = styled.div<IStyledOptionOverlay>`
    position: relative;
    width: ${props => props.noOptions === 2 ? '50%' : '33%'};
    height: 50px;
    transition: all 0.7s cubic-bezier(0.04, 0.46, 0.36, 0.99);
    touch-action: none;
    user-select: none;
    transform: ${props => props.selected ? 'translateX(100%)' : ''};
    &::after {
        position: absolute;
        left: 0;
        width: 100%;
        border-radius: 100px;
        height: 100%;
        background: #f1f1f1;
        opacity: 0.7;
        content: "";
        box-shadow: 2px 5px 9px #888888;
    }
`;

export const Option = styled.div<IStyledOption>`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: ${props => props.noOptions === 2 ? '50%' : '33%'};
    height: 100%;
    top: 0;
    pointer-events: none;
    user-select: none;
    color: ${props => props.selected ? '#9F938B' : '#f1f1f1'};
    font-weight: 800;
    transition: color 0.7s cubic-bezier(0.04, 0.46, 0.36, 0.99);
    box-sizing: border-box;
    left: ${props => {
        switch(props.position) {
            case 'left':
                return '0';
            case 'middle':
                return '33%';
            default:
                return null
        }
    }};
    right: ${props => props.position === 'right' ? '0' : null};

    span {
        pointer-events: none;
        user-select: none;
        transition: all .2s ease;
        font-weight: 500;
        font-size: 1.5vw;
    }
`;




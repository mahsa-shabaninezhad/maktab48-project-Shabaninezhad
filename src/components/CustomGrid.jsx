import { styled } from '@material-ui/core'

const CustomGrid = styled('div')(props => ({
    display: "grid",
    gap: props.gap || '2rem',
    rowGap: props.rowGap,
    columnGap: props.columnGap,
    gridTemplateColumns:  `repeat(auto-fit , minmax(min-content, ${props.cellWidth}))`,
    justifyContent: props.justifyContent || 'center',
    alignContent: props.alignContent || 'center',
    justifyItems: props.justifyItems || 'center',
    alignItems: props.alignItems || 'center',
    width: props.width || '100%',
    height: props.height || 'min-content'
    
}))

export default CustomGrid

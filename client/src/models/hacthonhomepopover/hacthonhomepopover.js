import {
    Button,
    Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent,
    PopoverHeader, PopoverTrigger
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import ManImage from './man.png';
import Image from './user.png';
import WomanImage from './woman.png';
export const PopOver = ({data}) => {
    const dispatch=useDispatch()
    return (
        <Popover>
            <PopoverTrigger>
                <img src={data?.Gender ? data.Gender === 'male' ? ManImage : WomanImage : Image} className='profile-img' alt={data?.Name}/>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Profile</PopoverHeader>
                <PopoverBody>
                    Name <strong>{data?.Name}</strong>
                </PopoverBody>
                <PopoverBody>
                    Gmail <strong>{data?.Gmail}</strong>
                </PopoverBody>
                <PopoverBody>
                    Branch <strong>{data?.Branch}</strong>
                </PopoverBody>
                <PopoverBody>
                    Section <strong>{data?.Section}</strong>
                </PopoverBody>
                <PopoverBody>
                    Year <strong>{data?.Year}</strong>
                </PopoverBody>
                <PopoverBody>
                    Register Number <strong>{data?.Reg_No}</strong>
                </PopoverBody>
                <PopoverBody>
                    Phone Number <strong>{data?.Number}</strong>
                </PopoverBody>
                <PopoverBody>
                   <Button onClick={()=>{dispatch({ type: 'AUTH', payload: { auth:null}});window.location.reload(5)}}>Log Out</Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
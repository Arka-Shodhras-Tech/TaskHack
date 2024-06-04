import {
    Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent,
    PopoverHeader, PopoverTrigger
} from '@chakra-ui/react';
import ManImage from './man.png';
import Image from './user.png';
import WomanImage from './woman.png';
export const PopOver = ({data}) => {
    return (
        <Popover>
            <PopoverTrigger>
                <img src={data?.Gender ? data.Gender === 'male' ? ManImage : WomanImage : Image} className='profile-img' />
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
            </PopoverContent>
        </Popover>
    )
}
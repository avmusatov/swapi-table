import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import Spinner from './spinner';

const Content = styled.div`
    padding: 15px 25px;
    display: flex;
    align-items: center;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    font-size: 1.3rem;
    margin-left: 50px;

    li {
        text-align: left;
        padding: 5px 0;
    }
`;

const Avatar = styled.img`
    width: 150px;
`;

interface Props {
    item: any;
    getImageUrl: (id: string) => string;
    displayedFields?: { field: any; label: string }[];
}

const Details = ({ item, getImageUrl, displayedFields }: Props): JSX.Element => {
    const [imageIsLoading, setImageIsLoading] = useState<boolean>(true);

    const showDefaultImage = useCallback((e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = 'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png';
    }, []);

    return (
        <Content>
            {imageIsLoading && <Spinner />}
            <Avatar
                src={getImageUrl(item.id)}
                onLoad={() => setImageIsLoading(false)}
                onError={showDefaultImage}
                alt={item.id}
            />
            <List>
                {displayedFields?.map(({ field, label }) => (
                    <li key={item[field]}>
                        <strong>{label}</strong>: {item[field]}
                    </li>
                ))}
            </List>
        </Content>
    );
};

export default Details;

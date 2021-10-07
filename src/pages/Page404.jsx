import React from 'react'
import Error from '../components/Error';

export default function Page404() {
    return (
        <Error
            height={[300, 400]}
            width={[300, 400, 500]}
            image="404.svg"
            text="Error 404: Page not found"
            subText="Please input a valid url"
        />
    )
}

import { useRouteError } from "react-router-dom";

export const ErrorPage = (props) => {
    const error = useRouteError();
    console.error(error);

    return (
	    <div>
	        <h1>Whoops...</h1>
	        <p>Sorry, I don't have anything else to provide. Here's an error.</p>
	        <p>{error.statusText || error.message}</p>
	    </div>
    );
}

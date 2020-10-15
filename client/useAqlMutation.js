import aqlQueryParser from './aqlQueryParser';

/* useAqlMutation is a promisified query hook that takes a GraphQL mutation query formatted 
as a string, and returns the response from the server. AQL tracking is automatically injected 
into the body of the request. You can chain methods using .then to control app behavior on 
resolution of the query. */

function useAqlMutation(query) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: aqlQueryParser(query),
      }),
    };
    console.log(aqlQueryParser(query));
    fetch(`/graphql`, options)
      .then((data) => data.json())
      .then((result) => resolve(result))
      .catch((err) => console.log(err));
  });
}

export default useAqlMutation;

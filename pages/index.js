import Layout from '../components/MyLayout';
import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
function fetcher(url) {
  return fetch(url).then(r => r.json());
}
function getPosts() {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js' },
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome' },
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT' }
  ];
}

const PostLink = ({ post }) => (
    <li>
      <Link href="/p/[id]" as={`/p/${post.id}`}>
        <a>{post.title}</a>
      </Link>
      <style jsx>{`
        li {
          list-style: none;
          margin: 5px 0;
        }
  
        a {
          text-decoration: none;
          color: blue;
          font-family: 'Arial';
        }
  
        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </li>
  );
  
export default function Blog() {
    const { query } = useRouter();
    const { data, error } = useSWR(
      `/api/randomQuote${query.author ? '?author=' + query.author : ''}`,
      fetcher
    );
    // The following line has optional chaining, added in Next.js v9.1.5,
    // is the same as `data && data.author`
    const author = data?.author;
    let quote = data?.quote;
  
    if (!data) quote = 'Loading...';
    if (error) quote = 'Failed to fetch the quote.';
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        {getPosts().map(post => (
          <PostLink key={post.id} post={post} />
        ))}
      </ul>
      <div className="center">
      <div className="quote">{quote}</div>
      {author && <span className="author">- {author}</span>}
    </div>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        } 
          .quote {
            font-family: cursive;
            color: #e243de;
            font-size: 24px;
            padding-bottom: 10px;
          }
          .author {
            font-family: sans-serif;
            color: #559834;
            font-size: 20px;
          }
      `}</style>
    </Layout>
  );
}

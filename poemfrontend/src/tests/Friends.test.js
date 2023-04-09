import { render, screen , cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'

afterEach(cleanup);

const poemObj = {
    id: 1,
    title: "Test Poem",
    content: "This is a test poem.",
    author: {
        id: 1,
        first_name: "Test Author",
        last_name: "Test Author",
        username: "testauthor",
    },
    is_liked: false,
    likes: 0,
    is_bookmarked: false,
    comment_count: 0,
}
import { render, screen , cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import {PoemViewer} from '../components/PoemViewer';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

const poemObj = {
    id: 1,
    title: "Test Poem",
    content: "This is a test poem.",
    author: {
        id: 1,
        first_name: "",
        last_name: "",
        username: "testauthor",
    },
    is_liked: false,
    likes: 0,
    is_bookmarked: false,
    comment_count: 0,
}

test('poem viewer render test', () => {
    render(<MemoryRouter><PoemViewer content={poemObj}/></MemoryRouter>);
    const poemViewerElement = screen.getByTestId('poem-viewer');
    expect(poemViewerElement).toBeInTheDocument();
});

test('poem viewer content test', () => {
    render(<MemoryRouter><PoemViewer content={poemObj}/></MemoryRouter>);
    const poemViewerElement = screen.getByTestId('poem-viewer');

    expect(poemViewerElement).toHaveTextContent(poemObj.title);
    expect(poemViewerElement).toHaveTextContent(poemObj.content);
});

test('poem viewer author', () => {
    render(<MemoryRouter><PoemViewer content={poemObj}/></MemoryRouter>);
    const poemViewerElement = screen.getByTestId('poem-viewer');

    expect(poemViewerElement).toHaveTextContent(poemObj.author.username);
});

test('poem viewer highlight',() => {
    render(<MemoryRouter><PoemViewer content={poemObj} highlighted={true}/></MemoryRouter>);
    const poemViewerElement = screen.getByTestId('coloured-top');
    //check that the highlighted class is applied
    expect(poemViewerElement).toHaveClass('highlighted');
})


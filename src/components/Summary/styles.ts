import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  @media(max-width: 768px){
    display: flex;
    flex-direction: column;
  }
  margin-top: -10rem;

  div{
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    @media(max-width: 425px){
      border: 1px solid #777;
      box-shadow: 0.5rem 0.5rem 0.5rem black;
    }
    color: var(---text-title);

    header{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong{
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    &.green{
      background: var(--green);
      color: var(--shape);
    }
    &.red{
      background: var(--red);
      color: var(--shape);
    }
    &.white{
      background: var(--shape);
      color: var(--text-title);
    }
  }
`
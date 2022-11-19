import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--background);
  color: var(--text-title);

  .main{
    width: 276px;

    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 2px solid var(--blue);
    border-radius: 10px;
    background: var(--shape);

    h2{
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    button{
      padding: 10px 20px;

      display: flex;
      align-items: center;
      
      font-size: 1rem;

      border: 1px solid var(--text-title);
      border-radius: 10px;

      cursor: pointer;

      transition: filter 0.2s;

      &:hover{
        filter: brightness(0.9);
      }
    }
  }
`

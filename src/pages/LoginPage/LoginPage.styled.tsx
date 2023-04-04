import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 40px;
  border-radius: 10px;
  text-align: left;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

  font-family: var(
    --joy-fontFamily-body,
    'Public Sans',
    var(
      --joy-fontFamily-fallback,
      var(
        --joy--apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Helvetica,
        Arial,
        sans-serif,
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol'
      )
    )
  );
`;

export const ErrorWrapper = styled.div`
  color: red;
  font-size: 12px;
  text-align: center;
`;

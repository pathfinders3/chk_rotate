const btnLineNum = document.getElementById('showLineNumbers');

// 버튼 클릭 이벤트 핸들러에서 특정 textarea를 전달
btnLineNum.addEventListener('click', () => {
  const myTextarea = document.getElementById('textInput');
  const lineNumber = getCaretLineNumber(myTextarea);
  
  console.log('##캐럿이 위치한 줄 번호:', lineNumber);
});



function getCaretLineNumber(textarea) {
  // textarea 요소에서 선택된 텍스트의 시작 인덱스 가져오기
  const start = textarea.selectionStart;

  // textarea의 value를 줄 단위로 배열로 분리
  const lines = textarea.value.split('\n');

  // 줄 바꿈 문자를 누적하여 현재 줄까지의 길이 계산
  let lineCount = 0;
  let position = 0;
  while (position <= start) {
    position += lines[lineCount].length + 1; // 줄 바꿈 문자 길이 추가
    lineCount++;
  }

  // 캐럿이 마지막 줄에 위치한 경우 처리
  return lineCount - 1;
}





/**
 * Function to create an EditableDIV displaying lines matching a regex with highlights.
 * @param {string} text - The input text to search within.
 * @param {RegExp} regex - The regular expression to match.
 */
function createEditableDivWithRegexHighlight(text, regex, nRangeUp) {
  // Clear previous output
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  // Create the EditableDIV container
  const editableDiv = document.createElement('div');
  editableDiv.contentEditable = 'true';
  editableDiv.style.border = '1px solid #ccc';
  editableDiv.style.padding = '10px';
  editableDiv.style.margin = '10px 0';
  editableDiv.style.fontSize = '10px';
  //editableDiv.style.fontFamily = 'Arial, sans-serif';
  editableDiv.style.whiteSpace = 'pre-wrap'; // Preserve newlines

  // Split the text into lines
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
	const line = lines[i];
	const isMatch = regex.test(line);

	// Check if the current line matches(현재 줄이 매칭 하면)
	//if (isMatch || regex.test(lines[i - 1] || lines[i + 1])) {
	if (isMatch) {
	  const startIndex = Math.max(0, i-nRangeUp); // Start from previous line (clamped to 0)
	  const endIndex = Math.min(lines.length-1, i+nRangeUp); // End at next line (clamped to last line)

	  // Loop through the relevant lines (current line and potentially surrounding lines)
	  for (let j = startIndex; j <= endIndex; j++) {
		const currentLine = lines[j];
		const highlightedLine = currentLine.replace(
		  regex,
		  (match) => `<span style="color: orange; font-weight: normal;background-color:#306630">${match}</span>`
		);

		// Set the line content with line number
		const lineDiv = document.createElement('div');
		lineDiv.innerHTML = `(줄)${j+1}: ${highlightedLine}`;
		editableDiv.appendChild(lineDiv);
	  }
	  // 단락 딜리미터 넣어서 구분해주기
	  const lineDelim = document.createElement('div');
	  lineDelim.innerHTML = `-----`;
	  editableDiv.appendChild(lineDelim);
	}
  }

  // Append the EditableDIV to the output container
  outputDiv.appendChild(editableDiv);
}	 


function createEditableDivWithRegexHighlight0(text, regex) {
	// Clear previous output
	const outputDiv = document.getElementById('output');
	outputDiv.innerHTML = '';

	// Create the EditableDIV container
	const editableDiv = document.createElement('div');
	editableDiv.contentEditable = 'true';
	editableDiv.style.border = '1px solid #ccc';
	editableDiv.style.padding = '10px';
	editableDiv.style.margin = '10px 0';
	//editableDiv.style.fontFamily = 'Arial, sans-serif';
	editableDiv.style.whiteSpace = 'pre-wrap'; // Preserve newlines

	// Split the text into lines and process each line
	const lines = text.split('\n');
	lines.forEach((line, index) => {
		if (regex.test(line)) {
			// Create a div for each matching line
			const lineDiv = document.createElement('div');

			// Extract the matching part with red highlight
			const highlightedLine = line.replace(
				regex,
				(match) => `<span style="color: red; font-weight: bold;">${match}</span>`
			);

			// Set the line content with line number
			lineDiv.innerHTML = `Line(줄)${index + 1}: ${highlightedLine}`;
			editableDiv.appendChild(lineDiv);
		}
	});

	// Append the EditableDIV to the output container
	outputDiv.appendChild(editableDiv);
}
// HTML_direct호출함수, (정규식에) 플래그 적용 함수
function processText() {
	const text = document.getElementById('textInput').value;	// 사용자 소스코드 부분
	const regexInput = document.getElementById('regexInput').value;	//원하는 정규식
	const regexFlags = document.getElementById('regexFlags').value;	//대소문자
	const nCatchRange = document.getElementById('txtCatchRange').value;	// 단락 크기
	const nRangeUpper = parseInt(nCatchRange/2);

	try {
		const regex = new RegExp(regexInput, regexFlags); // Create a regex with user-provided flags
		createEditableDivWithRegexHighlight(text, regex, nRangeUpper);
		
		addOptionToSelect('mySelect', regexInput);
	} catch (error) {
		alert('Invalid Regular Expression or Flags');
	}

}
	// 플래그 없는 함수
    // function processText0() {
        // const text = document.getElementById('textInput').value;
        // const regexInput = document.getElementById('regexInput').value;

        // try {
            // const regex = new RegExp(regexInput, 'gi'); // Create a case-insensitive regex
            // createEditableDivWithRegexHighlight(text, regex);
        // } catch (error) {
            // alert('Invalid Regular Expression');
        // }
    // }
	
// 옵션 추가. 주어진 SELECT 태그에 주어진 옵션 항목을 추가한다.
function addOptionToSelect(selectId, optionValue) {
  const selectElement = document.getElementById(selectId);

  // 먼저, 이미 존재하는 옵션인지 확인
  let isDuplicate = false;
  for (let i = 0; i < selectElement.options.length; i++) {
    //if (selectElement.options[i].value === optionValue) {
	const lowerCaseOptionValue = optionValue.toLowerCase();
    if (selectElement.options[i].value.toLowerCase() === lowerCaseOptionValue) {
      isDuplicate = true;
      break;
    }
  }

  // 중복이 아니라면 새로운 옵션 추가
  if (!isDuplicate) {
    const newOption = document.createElement('option');
    newOption.value = optionValue;
    newOption.textContent = optionValue;
    selectElement.appendChild(newOption);
  }
}

// function addOptionToSelect(selectId, optionValue) {
  // // 1. id를 이용하여 <select> 요소 가져오기
  // const selectElement = document.getElementById(selectId);
  // // 2. 새로운 <option> 요소 생성
  // const newOption = document.createElement('option');
  // // 3. 새 <option> 요소에 값 설정
  // newOption.value = optionValue;
  // newOption.textContent = optionValue;

  // // 4. <select> 요소에 새 <option> 추가
  // selectElement.appendChild(newOption);
// }	

function updateInputValue(event) {
	
  const selectedValue = event.target.value;
  const regexInput = document.getElementById('regexInput');
  regexInput.value = selectedValue;

}

/**
함수 끝 찾기
:중간지점을 주면, 함수 끝}을 찾는다.
JSFIDDLE 실행화면: https://postimg.cc/9Dg4xfMh
*/
// startLine: 0을 기준으로 하여 준다.
// openBraceCount: 이미 1개( {, opened}) 라고 가정하고 계산한다.
function getRawForthFunction(textarea, startLine) {
    const lines = textarea.value.split('\n');
    //let openBraceCount = 1;//1개가 열려있다고 가정
	let openBraceCount = 0;

    for (let i = startLine; i < lines.length; i++) {
        const line = lines[i];

		if (undefined == line) {
			continue;
		}
		//console.log(line,"을 체크합니다",i);
      // Count opening and closing braces
      const openLen = (line.match(/{/g) || []).length;
      const closeLen = (line.match(/}/g) || []).length;

      if (openLen == 0 && closeLen == 0) {
      } else {
        if (openLen > 0) {
          openBraceCount += openLen;
    			console.log(`${line} open:${openBraceCount}개 상황(Opening?)`);          
        }
        if (closeLen > 0) {
          openBraceCount -= closeLen;
	    		console.log(`${line} open:${openBraceCount}개 상황(Closing?)`);          
        }
      }

      // Check if the number of open braces is zero, indicating the end of the function
        if (openBraceCount === 0 && i > startLine - 1) {
					console.log(`끝줄 ${line}, No:${i+1}`);
            return i; // 0-base 줄번호. Return the 줄번호 of closing
        } else {
        	//console.log(`SOMETHING WRONG: ${line}, No:${i+1}`);
        }
    }
		// 열린 채 끝났다.
    if (openBraceCount > 0) {
    	console.log(`SOMETHING OPENED: ${openBraceCount} ≽ 0`);    
    }
    return -1; // Return -1 if the end of func. is not found
}
// HTML직접호출.
function findFunctionEnd() {
    const textarea = document.getElementById('myCode');
    const startLine = 5; // 매번 커서가 있는 줄을 수동으로 주어야...(혹은 첫줄을 구해야 한다)
    //const endLine = findRawForthFunction(textarea.value, startLine);
		const endLine = getRawForthFunction(textarea, startLine);
    
    document.getElementById('result').textContent = `함수의 끝 줄: ${endLine}`;
}


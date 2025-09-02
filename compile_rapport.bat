@echo off
echo Compiling FanRadar Report (auto-detect engine)...
echo.

REM Determine path to source (assume docs\rapport.txt)
set "SCRIPT_DIR=%~dp0"
set "SRC=%SCRIPT_DIR%docs\rapport.txt"
if not exist "%SRC%" (
  echo ERROR: Source file not found: "%SRC%"
  echo Please ensure the LaTeX source is at docs\rapport.txt or update this script.
  pause
  exit /b 1
)

REM Prefer XeLaTeX (required for fontspec). If not present, try pdflatex only when safe.
where xelatex >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo XeLaTeX found. Compiling with xelatex (fontspec-compatible)...
  echo Running first compilation...
  xelatex -interaction=nonstopmode "%SRC%"
  echo Running second compilation...
  xelatex -interaction=nonstopmode "%SRC%"
  goto :check_pdf
)

echo XeLaTeX not found. Checking for fontspec usage in source...
findstr /C:"\usepackage{fontspec}" "%SRC%" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo ERROR: The document requires XeLaTeX or LuaLaTeX because it uses the fontspec package.
  echo Please install a TeX engine with XeLaTeX (TeX Live or MiKTeX) and ensure "xelatex" is on PATH.
  echo Alternatively, edit the preamble to remove fontspec for pdflatex compatibility.
  pause
  exit /b 2
)

REM If we reach here, fontspec is not used — try pdflatex if available.
where pdflatex >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Neither xelatex nor pdflatex were found in PATH.
  echo Please install a TeX distribution (TeX Live or MiKTeX) and add it to PATH.
  pause
  exit /b 1
)

echo pdflatex found. Compiling with pdflatex...
echo Running first compilation...
pdflatex -interaction=nonstopmode "%SRC%"
echo Running second compilation...
pdflatex -interaction=nonstopmode "%SRC%"

:check_pdf
echo.
REM Determine expected PDF path (basename of source)
for %%F in ("%SRC%") do set "BASENAME=%%~nF"
set "PDF=%SCRIPT_DIR%%BASENAME%.pdf"
if exist "%PDF%" (
    echo SUCCESS: %BASENAME%.pdf generated successfully!
    echo Opening PDF...
    start "" "%PDF%"
 ) else (
    echo ERROR: Compilation failed
    echo Check the log files (in %SCRIPT_DIR%) for details
)

pause

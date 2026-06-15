<div class="flex flex-col gap-8 w-full sm:w-7/10">
    <h1>Resume</h1>

    <div class="resume-pdf-container">
        <object data="/KristyMoore_Resume.pdf" type="application/pdf" title="Kristy's Resume PDF" width="100%" height="100%">
            <p>Your browser does not support embedded PDFs. You can <a href="/KristyMoore_Resume.pdf" download>download the resume here</a> instead.</p>
        </object>
    </div>
</div>

<style>
    .resume-pdf-container {
        width: 100%;
        max-width: 100%;
        min-height: 70vh;
    }

    .resume-pdf-container object {
        width: 100%;
        height: 900px;
        min-height: 600px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-sizing: border-box;
    }

    @media (max-width: 1024px) {
        .resume-pdf-container object {
            height: 80vh;
        }
    }

    @media (max-width: 640px) {
        .resume-pdf-container object {
            height: 70vh;
        }
    }
</style>
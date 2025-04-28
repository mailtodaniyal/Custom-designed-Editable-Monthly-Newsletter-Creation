document.addEventListener('DOMContentLoaded', function() {
    // CMS Editor Toggle
    const toggleEditor = document.getElementById('toggle-editor');
    const cmsEditor = document.getElementById('cms-editor');
    
    toggleEditor.addEventListener('click', function() {
        if (cmsEditor.style.display === 'block') {
            cmsEditor.style.display = 'none';
        } else {
            loadEditorData();
            cmsEditor.style.display = 'block';
        }
    });
    
    // Load current data into editor
    function loadEditorData() {
        document.getElementById('edit-issue-number').value = 
            document.getElementById('issue-number').textContent;
        
        document.getElementById('edit-banner-text').value = 
            document.getElementById('monthly-banner').textContent.trim();
        
        document.getElementById('edit-ceo-message').value = 
            document.getElementById('ceo-message-content').innerHTML
            .replace(/<p>/g, '').replace(/<\/p>/g, '\n')
            .replace(/<p class="author">/g, '').trim();
        
        document.getElementById('edit-blog-title').value = 
            document.getElementById('blog-title').textContent;
        
        document.getElementById('edit-blog-body').value = 
            document.getElementById('blog-body').textContent;
        
        const bullets = Array.from(document.getElementById('blog-bullets').children)
            .map(li => li.textContent).join('\n');
        document.getElementById('edit-blog-bullets').value = bullets;
        
        document.getElementById('edit-blog-link').value = 
            document.getElementById('blog-link').getAttribute('href');
        
        const updates = Array.from(document.getElementById('updates-list').children)
            .map(li => li.textContent).join('\n');
        document.getElementById('edit-updates').value = updates;
    }
    
    // Save changes
    document.getElementById('save-changes').addEventListener('click', function() {
        // Update issue number
        document.getElementById('issue-number').textContent = 
            document.getElementById('edit-issue-number').value;
        
        // Update banner
        document.getElementById('monthly-banner').textContent = 
            document.getElementById('edit-banner-text').value;
        
        // Update CEO message
        const ceoMessage = document.getElementById('edit-ceo-message').value
            .split('\n')
            .map(para => para.trim() ? `<p>${para}</p>` : '')
            .join('');
        document.getElementById('ceo-message-content').innerHTML = ceoMessage + 
            '<p class="author">- Josh, CEO</p>';
        
        // Update blog
        document.getElementById('blog-title').textContent = 
            document.getElementById('edit-blog-title').value;
        
        document.getElementById('blog-body').textContent = 
            document.getElementById('edit-blog-body').value;
        
        const bullets = document.getElementById('edit-blog-bullets').value
            .split('\n')
            .filter(b => b.trim())
            .map(b => `<li>${b}</li>`)
            .join('');
        document.getElementById('blog-bullets').innerHTML = bullets;
        
        document.getElementById('blog-link').setAttribute('href', 
            document.getElementById('edit-blog-link').value);
        
        // Update updates
        const updates = document.getElementById('edit-updates').value
            .split('\n')
            .filter(u => u.trim())
            .map(u => `<li>${u}</li>`)
            .join('');
        document.getElementById('updates-list').innerHTML = updates;
        
        // Hide editor
        cmsEditor.style.display = 'none';
        
        // Show success message
        alert('Changes saved successfully!');
    });
    
    // Cancel changes
    document.getElementById('cancel-changes').addEventListener('click', function() {
        cmsEditor.style.display = 'none';
    });
    
    // Image upload simulation
    document.getElementById('blog-image').addEventListener('click', function() {
        const colorInput = prompt('Enter a color for the blog image (hex, rgb, or name):');
        if (colorInput) {
            this.style.backgroundColor = colorInput;
        }
    });
});

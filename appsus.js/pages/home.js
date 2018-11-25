'use strict';

export default {
    template: `
        <section class="home-container">
        <h1>Welcome to Appsus!</h1>
            <router-link to="/email" title="Email Chimp" class="home-email-link">
                <i class="fab fa-mailchimp"></i>
                <h3>Email Chimp</h3>
            </router-link>
            
            <router-link to="/keep" title="keep" class="home-keep-link">
                <i class="fas fa-chess-board keep"></i>
                <h3>Keep</h3>
            </router-link>

        </section>
    `, 
}
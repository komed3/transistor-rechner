                </main>
                <footer id="footer">
                    <div class="footer-inner">
                        <nav>
                            <?php wp_nav_menu( [
                                'theme_location' => 'footer',
                                'container' => '',
                                'fallback_cb' => false
                            ] ); ?>
                        </nav>
                        <div class="credits">
                            <?php printf(
                                __( '<a href="%s">%s</a> &copy; %s by <a href="%s" target="_blank">%s</a>. ' .
                                    'All rights reserved.', 'transistor' ),
                                home_url( '/' ),
                                get_bloginfo( 'title' ),
                                wp_date( 'Y' ),
                                'https://github.com/komed3',
                                'komed3'
                            ); ?>
                        </div>
                    </div>
                </footer>
            </div>
        <?php wp_footer(); ?>
    </body>
</html>
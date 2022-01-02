<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/">
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <header id="header" class="clearfix" role="banner">
            <div class="header-inner">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-link">
                    <h1><?php bloginfo( 'title' ); ?></h1>
                    <h2><?php bloginfo( 'description' ); ?></h2>
                </a>
                <nav role="navigation">
                    <?php wp_nav_menu( [
                        'theme_location' => 'primary',
                        'container' => '',
                        'fallback_cb' => false
                    ] ); ?>
                </nav>
            </div>
        </header>
        <main class="clearfix">
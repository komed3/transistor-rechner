<?php

    function __theme_init() {

        register_nav_menus( [
            'primary' => __( 'Primary', 'transistor' ),
            'footer' => __( 'Footer', 'transistor' )
        ] );

        if( !is_admin() )
            show_admin_bar( false );

    }

    add_action( 'init', '__theme_init' );

    function __theme_setup() {

        add_theme_support( 'title-tag' );

    }

    add_action( 'after_setup_theme', '__theme_setup' );

    function __theme_styles() {

        wp_enqueue_style( 'transistor',
            get_stylesheet_directory_uri() . '/style.css'
        );

        wp_enqueue_style( 'transistor-global',
            get_stylesheet_directory_uri() . '/src/global.css'
        );

        wp_enqueue_style( 'dashicons' );

    }

    add_action( 'wp_enqueue_scripts', '__theme_styles' );

?>
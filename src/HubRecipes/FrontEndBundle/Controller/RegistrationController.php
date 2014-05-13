<?php
/**
 * Created by PhpStorm.
 * User: miezis
 * Date: 5/13/14
 * Time: 5:47 PM
 */

namespace HubRecipes\FrontEndBundle\Controller;

use HubRecipes\FrontEndBundle\Controller\DefaultController;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\RedirectResponse;

use FOS\UserBundle\Controller\RegistrationController as BaseController;

class RegistrationController extends BaseController {
    /**
     * Tell the user his account is now confirmed
     */
    public function confirmedAction()
    {
        $url = $this->container->get('router')->generate('hub_recipes_front_end_homepage');
        return new RedirectResponse($url);
    }
} 